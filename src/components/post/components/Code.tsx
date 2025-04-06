import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import CodeMirror from "@uiw/react-codemirror";
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
    <div className="w-full overflow-hidden rounded-sm flex">
      <CodeMirror
        className="w-full"
        value={code}
        height="auto"
        theme={githubDark}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        editable={false}
        readOnly={false}
      />
    </div>
  );
};

export default Code;
