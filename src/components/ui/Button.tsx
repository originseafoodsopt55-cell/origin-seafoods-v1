import React from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "hero-orange" | "hero-blue" | "outline" | "header";

interface BaseButtonProps {
  children: ReactNode;
  variant: ButtonVariant;
  className?: string;
}

type LinkButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  "hero-orange": "hero-button orange",
  "hero-blue": "hero-button blue",
  outline: "outline-action",
  header: "header-cta"
};

export function Button(props: ButtonProps) {
  const className = [variantClasses[props.variant], props.className].filter(Boolean).join(" ");

  if ("href" in props && props.href) {
    const { children, variant, className: customClassName, ...linkProps } = props;
    void variant;
    void customClassName;
    return (
      <a className={className} {...linkProps}>
        {children}
      </a>
    );
  }

  const { children, variant, className: customClassName, ...buttonProps } = props as NativeButtonProps;
  void variant;
  void customClassName;
  return (
    <button className={className} {...buttonProps}>
      {children}
    </button>
  );
}
