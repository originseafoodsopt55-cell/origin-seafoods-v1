"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { resolveMediaUrl } from "@/lib/cms/media";

function renderTextNode(child: any, key: number) {
  const text = child.text ?? "";
  if (!text) return null;

  let element: React.ReactNode = text;
  // Lexical format flags: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline, 16 = code
  if (child.format & 1) {
    element = <strong key={key}>{element}</strong>;
  }
  if (child.format & 2) {
    element = <em key={key}>{element}</em>;
  }
  if (child.format & 8) {
    element = <u key={key}>{element}</u>;
  }
  return <React.Fragment key={key}>{element}</React.Fragment>;
}

function renderASTNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  // Upload / Image Node
  if (node.type === "upload" || node.type === "image") {
    const rawUrl = node.value?.url || node.value?.src || node.fields?.doc?.value?.url || "";
    const src = resolveMediaUrl(rawUrl);
    const alt = node.value?.alt || node.fields?.doc?.value?.alt || "รูปภาพประกอบบทความ";
    if (!src) return null;

    return (
      <figure key={index} className="news-body-image my-6">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={600}
          className="rounded-xl object-cover w-full h-auto"
          quality={90}
        />
        {alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{alt}</figcaption>}
      </figure>
    );
  }

  // Heading Node
  if (node.type === "heading") {
    const children = (node.children || []).map((c: any, i: number) => renderTextNode(c, i));
    if (node.tag === "h1") return <h1 key={index} className="font-bold text-3xl text-gray-900 mt-8 mb-4">{children}</h1>;
    if (node.tag === "h3") return <h3 key={index} className="font-bold text-xl text-gray-900 mt-6 mb-3">{children}</h3>;
    return <h2 key={index} className="font-bold text-2xl text-gray-900 mt-8 mb-4">{children}</h2>;
  }

  // Paragraph Node
  if (node.type === "paragraph") {
    const children = (node.children || []).map((c: any, i: number) => renderTextNode(c, i));
    if (children.length === 0) return null;
    return (
      <p key={index} className="mb-5 text-gray-700 leading-relaxed">
        {children}
      </p>
    );
  }

  // Quote Node
  if (node.type === "quote") {
    const children = (node.children || []).map((c: any, i: number) => renderTextNode(c, i));
    return (
      <blockquote key={index} className="border-l-4 border-[#082b59] pl-4 italic text-gray-800 my-6">
        {children}
      </blockquote>
    );
  }

  // List Node
  if (node.type === "list") {
    const Tag = node.listType === "number" ? "ol" : "ul";
    return (
      <Tag key={index} className="list-disc pl-6 mb-5 text-gray-700 space-y-2">
        {(node.children || []).map((item: any, i: number) => (
          <li key={i}>
            {(item.children || []).map((c: any, j: number) => renderTextNode(c, j))}
          </li>
        ))}
      </Tag>
    );
  }

  return null;
}

export function NewsRichText({ data }: { data: any }) {
  if (!data || !data.root || !Array.isArray(data.root.children)) {
    return null;
  }

  return (
    <div className="news-body-content prose max-w-none">
      {data.root.children.map((node: any, i: number) => renderASTNode(node, i))}
    </div>
  );
}
