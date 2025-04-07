import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
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

const Code = ({ id, parentId, components, ...props }: CodeProps) => {
  const code = components?.[id]?.text ?? "";

  return (
    <CodeMirror
      value={code}
      height="auto"
      width="auto"
      theme={githubDark}
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        // EditorView.lineWrapping,
      ]}
      editable={false}
      readOnly={false}
    />
  );
};

export default Code;
