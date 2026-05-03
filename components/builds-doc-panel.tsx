"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Character } from "@/lib/characters";
import { CharacterColors } from "@/lib/color-map";
import { cn } from "@/lib/utils";
import {
  getEntityType,
  getCardImageUrl,
  EntityType,
} from "@/lib/game-entities";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  AlertCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BuildsDocPanelProps {
  character: Character;
  colors: CharacterColors;
}

// Module-level cache: key = `{characterId}/{buildId}`, value = content or Error sentinel
const mdCache = new Map<string, string | null>();

// ── Entity colour palette ────────────────────────────────────────────────────
const ENTITY_STYLE: Record<
  EntityType,
  { text: string; bg: string; border: string; label: string }
> = {
  card: {
    text: "text-entity-card",
    bg: "bg-entity-card/15",
    border: "border-entity-card/50",
    label: "Card",
  },
  relic: {
    text: "text-entity-relic",
    bg: "bg-entity-relic/15",
    border: "border-entity-relic/50",
    label: "Relic",
  },
  potion: {
    text: "text-entity-potion",
    bg: "bg-entity-potion/15",
    border: "border-entity-potion/50",
    label: "Potion",
  },
  enemy: {
    text: "text-entity-enemy",
    bg: "bg-entity-enemy/15",
    border: "border-entity-enemy/50",
    label: "Enemy",
  },
};

// ── Flatten a ReactNode tree to plain text (for entity lookup) ───────────────
function nodeToText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (node && typeof node === "object" && "props" in (node as object)) {
    const { props } = node as { props: Record<string, unknown> };
    return nodeToText(props.children as React.ReactNode);
  }
  return "";
}

// ── Floating tooltip rendered into document.body ─────────────────────────────
interface TooltipPos {
  x: number;
  y: number;
}

function EntityTooltip({
  type,
  name,
  x,
  y,
}: {
  type: EntityType;
  name: string;
  x: number;
  y: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const style = ENTITY_STYLE[type];
  const imgUrl = type === "card" ? getCardImageUrl(name) : null;

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y - 10,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-2.5 shadow-2xl",
        "bg-card backdrop-blur-md",
        style.border,
      )}
    >
      {imgUrl && !imgFailed && (
        <img
          src={imgUrl}
          alt={name}
          className="w-36 h-auto rounded-lg"
          onError={() => setImgFailed(true)}
        />
      )}
      <span className={cn("text-xs font-bold leading-tight", style.text)}>
        {name}
      </span>
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
          style.bg,
          style.text,
        )}
      >
        {style.label}
      </span>
    </div>
  );
}

// ── Inline entity token with hover-tooltip ───────────────────────────────────
function EntityToken({
  type,
  name,
  children,
}: {
  type: EntityType;
  name: string;
  children: React.ReactNode;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<TooltipPos | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setPos({ x: rect.left + rect.width / 2, y: rect.top });
    }
  }, []);

  const handleMouseLeave = useCallback(() => setPos(null), []);

  return (
    <>
      <span
        ref={spanRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "font-bold cursor-default transition-colors underline underline-offset-2 decoration-dotted",
          ENTITY_STYLE[type].text,
        )}
      >
        {children}
      </span>
      {mounted &&
        pos &&
        createPortal(
          <EntityTooltip type={type} name={name} x={pos.x} y={pos.y} />,
          document.body,
        )}
    </>
  );
}

// ── Main panel ───────────────────────────────────────────────────────────────
export function BuildsDocPanel({ character, colors }: BuildsDocPanelProps) {
  const [selectedBuild, setSelectedBuild] = useState<string | null>(
    character.builds[0]?.id ?? null,
  );
  const [buildsOpen, setBuildsOpen] = useState(true);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!selectedBuild) {
      setMarkdown(null);
      setError(null);
      return;
    }

    const cacheKey = `${character.id}/${selectedBuild}`;

    if (mdCache.has(cacheKey)) {
      const cached = mdCache.get(cacheKey);
      if (cached === null) {
        setError(
          `No file found. Add one at /public/docs/${character.id}/${selectedBuild}.md`,
        );
        setMarkdown(null);
      } else {
        setMarkdown(cached ?? null);
        setError(null);
      }
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchMarkdown = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/docs/${character.id}/${selectedBuild}.md`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("not found");
        const text = await res.text();
        mdCache.set(cacheKey, text);
        setMarkdown(text);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        mdCache.set(cacheKey, null);
        setError(
          `No file found. Add one at /public/docs/${character.id}/${selectedBuild}.md`,
        );
        setMarkdown(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkdown();

    return () => controller.abort();
  }, [selectedBuild, character.id]);

  const activeBuild = character.builds.find((b) => b.id === selectedBuild);

  const strongRenderer = useCallback(
    ({ children }: { children?: React.ReactNode }) => {
      const text = nodeToText(children);
      const entityType = getEntityType(text);
      if (!entityType) {
        return (
          <strong className={cn("font-bold", colors.text)}>{children}</strong>
        );
      }
      return (
        <EntityToken type={entityType} name={text}>
          {children}
        </EntityToken>
      );
    },
    [colors.text],
  );

  return (
    <div
      className={cn(
        "rounded-xl border-2 bg-card/50 backdrop-blur-sm overflow-hidden",
        colors.border,
      )}
    >
      <div className="flex min-h-[480px]">
        {/* Left: collapsible builds list */}
        <div
          className={cn(
            "border-r flex flex-col transition-all duration-300",
            colors.border,
            buildsOpen ? "w-64 min-w-[16rem]" : "w-12 min-w-[3rem]",
          )}
        >
          <button
            onClick={() => setBuildsOpen((o) => !o)}
            className={cn(
              "flex items-center gap-2 p-3 w-full text-left",
              "border-b hover:bg-accent/50 transition-colors",
              colors.border,
              colors.text,
            )}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            {buildsOpen && (
              <span className="font-semibold text-sm flex-1">Builds</span>
            )}
            {buildsOpen ? (
              <ChevronDown className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 shrink-0" />
            )}
          </button>

          {buildsOpen && (
            <div className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
              {character.builds.map((build) => (
                <button
                  key={build.id}
                  onClick={() => setSelectedBuild(build.id)}
                  className={cn(
                    "w-full text-left rounded-lg px-3 py-2.5",
                    "transition-all duration-150",
                    "flex flex-col gap-0.5",
                    selectedBuild === build.id
                      ? cn("bg-accent", colors.text)
                      : "bg-background/40 text-foreground hover:bg-accent/40",
                  )}
                >
                  <span
                    className={cn(
                      "font-medium text-sm",
                      selectedBuild === build.id ? colors.text : "",
                    )}
                  >
                    {build.name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {build.description}
                  </span>
                </button>
              ))}
              <p className="text-muted-foreground/60 text-[10px] mt-auto pt-3 px-1 leading-relaxed">
                Add .md files to{" "}
                <code className="bg-muted px-1 rounded">
                  /public/docs/{character.id}/
                </code>
              </p>
            </div>
          )}
        </div>

        {/* Right: markdown content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Doc header */}
          <div
            className={cn(
              "flex items-center gap-2 px-5 py-3 border-b",
              colors.border,
            )}
          >
            <FileText className={cn("w-4 h-4 shrink-0", colors.text)} />
            <h2 className={cn("font-bold text-base", colors.text)}>
              {activeBuild ? activeBuild.name : "Documentation"}
            </h2>
          </div>

          {/* Entity type legend */}
          <div className="flex items-center gap-4 px-5 py-1.5 border-b border-border/40 flex-wrap">
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mr-1">
              Legend
            </span>
            {(
              Object.entries(ENTITY_STYLE) as [
                EntityType,
                (typeof ENTITY_STYLE)[EntityType],
              ][]
            ).map(([type, style]) => (
              <span
                key={type}
                className={cn(
                  "text-[11px] font-semibold flex items-center gap-1",
                  style.text,
                )}
              >
                <span
                  className={cn("inline-block w-2 h-2 rounded-full", style.bg)}
                  style={{ border: `1.5px solid currentColor` }}
                />
                {style.label}
              </span>
            ))}
          </div>

          {/* Doc body */}
          <div className="flex-1 overflow-y-auto p-5">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div
                  className={cn(
                    "w-7 h-7 border-4 border-t-transparent rounded-full animate-spin",
                    colors.border,
                  )}
                />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                <AlertCircle className="w-10 h-10 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm max-w-md">
                  {error}
                </p>
              </div>
            ) : markdown ? (
              <div
                className="prose prose-sm max-w-none
                prose-headings:font-bold
                prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-0
                prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-6
                prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4
                prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4 prose-ul:space-y-1
                prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-4
                prose-li:text-foreground/90
                prose-strong:font-bold
                prose-em:italic
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                prose-table:w-full prose-table:border-collapse
                prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:bg-muted/50
                prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2
                prose-img:rounded-lg prose-img:border prose-img:border-border prose-img:max-w-full
                prose-a:underline prose-a:underline-offset-2
              "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1
                        className={cn(
                          "text-2xl font-bold mb-4 mt-0",
                          colors.text,
                        )}
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2
                        className={cn(
                          "text-xl font-semibold mb-3 mt-6",
                          colors.text,
                        )}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3
                        className={cn(
                          "text-lg font-semibold mb-2 mt-4",
                          colors.text,
                        )}
                      >
                        {children}
                      </h3>
                    ),
                    strong: strongRenderer,
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className={cn(
                          "underline hover:no-underline",
                          colors.text,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote
                        className={cn(
                          "border-l-4 pl-4 italic text-muted-foreground my-4",
                          colors.border,
                        )}
                      >
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="w-full border-collapse text-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th
                        className={cn(
                          "border px-3 py-2 text-left font-semibold bg-muted/50",
                          colors.border,
                          colors.text,
                        )}
                      >
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td
                        className={cn(
                          "border px-3 py-2 text-foreground/90",
                          colors.border,
                        )}
                      >
                        {children}
                      </td>
                    ),
                    img: ({ src, alt }) => (
                      <img
                        src={src}
                        alt={alt ?? ""}
                        className="rounded-lg border border-border max-w-full my-4"
                      />
                    ),
                    code: ({ children, className }) => {
                      const isBlock = !!className;
                      return isBlock ? (
                        <code className="block bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          {children}
                        </code>
                      ) : (
                        <code
                          className={cn(
                            "bg-muted px-1.5 py-0.5 rounded text-sm",
                            colors.text,
                          )}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                <FileText className="w-10 h-10 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm">
                  Select a build to view its documentation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
