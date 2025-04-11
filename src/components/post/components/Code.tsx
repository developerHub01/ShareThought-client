import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

interface CodeProps {
  id: string;
  className?: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
  [key: string]: unknown;
}

export type { CodeProps };

const Code = ({ id, parentId, components, metaData, ...props }: CodeProps) => {
  const code = components?.[id]?.text ?? "";
  const component = components?.[id];

  if (!component) return null;

  const selectedTheme =
    component.codeThemeMode ??
    metaData?.globalStyles?.desktop?.code?.background ??
    "dark";

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full border-2 border-accent">
        <CodeMirror
          value={code}
          height="auto"
          width="auto"
          theme={selectedTheme === "dark" ? githubDark : githubLight}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
            // EditorView.lineWrapping,
          ]}
          editable={false}
          readOnly={false}
        />
      </div>
    </div>
  );
};

export default Code;
