import React, { CSSProperties } from "react";

export type BlockquoteVariantType =
  | "v1"
  | "v2"
  | "v3"
  | "v4"
  | "v5"
  | "v6"
  | "v7"
  | "v8"
  | "v9"
  | "v10";

interface BlockquoteProps {
  variant?: BlockquoteVariantType;
  quote?: string;
  author?: string;
  styles?: CSSProperties;
}

const Blockquote = ({
  variant = "v1",
  styles = {},
  ...otherProps
}: BlockquoteProps) => {
  const Comp = () => {
    switch (variant) {
      case "v2":
        return <BlockquoteV2 {...otherProps} />;
      case "v3":
        return <BlockquoteV3 {...otherProps} />;
      case "v4":
        return <BlockquoteV4 {...otherProps} />;
      case "v5":
        return <BlockquoteV5 {...otherProps} />;
      case "v6":
        return <BlockquoteV6 {...otherProps} />;
      case "v7":
        return <BlockquoteV7 {...otherProps} />;
      case "v8":
        return <BlockquoteV8 {...otherProps} />;
      case "v9":
        return <BlockquoteV9 {...otherProps} />;
      case "v10":
        return <BlockquoteV10 {...otherProps} />;
      case "v1":
      default:
        return <BlockquoteV1 {...otherProps} />;
    }
  };

  return (
    <div
      className="blockquote-container"
      style={{
        ...styles,
      }}
    >
      <Comp />
    </div>
  );
};

interface BlockquoteCompProps {
  quote?: string;
  author?: string;
}

const BlockquoteV1 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="border-l-2 border-primary pl-6 italic text-muted-foreground">
      <p>"{quote}"</p>
      {author && <footer className="mt-2 text-sm">— {author}</footer>}
    </blockquote>
  );
};

const BlockquoteV2 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="rounded-lg bg-muted p-6 text-muted-foreground">
      <p>"{quote}"</p>
      {author && (
        <footer className="mt-2 text-sm font-medium">— {author}</footer>
      )}
    </blockquote>
  );
};

const BlockquoteV3 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="relative border-l-0 pl-10 pr-4 py-2 italic">
      <span className="absolute left-0 top-0 text-6xl text-primary opacity-25">
        "
      </span>
      <p className="relative z-10">{quote}</p>
      {author && (
        <footer className="relative z-10 mt-2 text-sm">— {author}</footer>
      )}
      <span className="absolute right-0 bottom-0 text-6xl text-primary opacity-25">
        "
      </span>
    </blockquote>
  );
};

const BlockquoteV4 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="rounded-lg border bg-card p-6 shadow-sm">
      <p className="text-card-foreground">"{quote}"</p>
      {author && (
        <footer className="mt-2 text-sm text-muted-foreground">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

const BlockquoteV5 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="border-t border-b py-4 text-center text-muted-foreground">
      <p className="text-lg font-light italic">"{quote}"</p>
      {author && <footer className="mt-2 text-sm">— {author}</footer>}
    </blockquote>
  );
};

const BlockquoteV6 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-6 font-serif">
      <p className="text-amber-900 dark:text-amber-200">"{quote}"</p>
      {author && (
        <footer className="mt-2 text-sm text-amber-800 dark:text-amber-300 italic">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

const BlockquoteV7 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="relative bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 dark:from-amber-950/50 dark:via-amber-900/30 dark:to-amber-950/50 p-6 rounded-lg border-t-2 border-b-2 border-amber-800/30 dark:border-amber-700/50 font-serif">
      <p className="text-amber-950 dark:text-amber-100">"{quote}"</p>
      {author && (
        <footer className="mt-2 text-right text-sm text-amber-800 dark:text-amber-300">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

const BlockquoteV8 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="relative border-2 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30 p-6 rounded-md">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500 dark:border-purple-400 -translate-x-1 -translate-y-1"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500 dark:border-purple-400 translate-x-1 -translate-y-1"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500 dark:border-purple-400 -translate-x-1 translate-y-1"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500 dark:border-purple-400 translate-x-1 translate-y-1"></div>
      <p className="text-purple-900 dark:text-purple-200">"{quote}"</p>
      {author && (
        <footer className="mt-2 text-sm text-purple-700 dark:text-purple-300">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

const BlockquoteV9 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="bg-stone-800 text-stone-200 border-4 border-amber-700 p-5 rounded-md font-serif">
      <p className="text-center">"{quote}"</p>
      {author && (
        <footer className="mt-2 text-center text-sm text-amber-400">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

const BlockquoteV10 = ({ quote, author }: BlockquoteCompProps) => {
  return (
    <blockquote className="bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 p-6 font-serif">
      <div className="flex">
        <div className="text-4xl text-red-800 dark:text-red-600 font-serif leading-none mr-2">
          "
        </div>
        <div className="flex-1">
          <p className="text-stone-800 dark:text-stone-200">{quote}</p>
          {author && (
            <footer className="mt-2 text-right text-sm text-stone-600 dark:text-stone-400 italic">
              — {author}
            </footer>
          )}
        </div>
        <div className="text-4xl text-red-800 dark:text-red-600 font-serif leading-none self-end ml-2">
          "
        </div>
      </div>
    </blockquote>
  );
};

export default Blockquote;
