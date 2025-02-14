import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { CSSProperties } from "react";

interface HeadingProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Heading = ({ id, components, metaData }: HeadingProps) => {
  const component = components[id];

  const componentStyle = (metaData.styles[id] || {}) as CSSProperties;

  switch (component.type) {
    case "p":
      return (
        <p style={componentStyle} className="text-base">
          {component.text}
        </p>
      );
    case "h2":
      return (
        <h2 style={componentStyle} className="text-3xl font-bold">
          {component.text}
        </h2>
      );
    case "h3":
      return (
        <h3 style={componentStyle} className="text-2xl font-bold">
          {component.text}
        </h3>
      );
    case "h4":
      return (
        <h4 style={componentStyle} className="text-xl font-bold">
          {component.text}
        </h4>
      );
    case "h5":
      return (
        <h5 style={componentStyle} className="text-lg font-bold">
          {component.text}
        </h5>
      );
    case "h6":
      return (
        <h6 style={componentStyle} className="text-base font-bold">
          {component.text}
        </h6>
      );
    default:
      return (
        <h1 style={componentStyle} className="text-4xl font-bold">
          {component.text}
        </h1>
      );
  }
};

export default Heading;
