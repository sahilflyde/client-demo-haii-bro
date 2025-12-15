
"use client";
import { componentRegistry } from "./componentRegistry";

export default function RenderBlock({ block }) {
  const Comp = componentRegistry[block.type];
  if (!Comp) return null;
  return <Comp {...block.props} children={block.children} />;
}
