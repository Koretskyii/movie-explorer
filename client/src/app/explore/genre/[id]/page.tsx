"use client";

import React, { forwardRef } from "react";
import { VirtuosoGrid, VirtuosoGridProps } from "react-virtuoso";

export default function GenrePage() {
  const items = Array.from({ length: 100 }, (_, i) => `Item with index ${i}`);

  const gridComponents: VirtuosoGridProps<undefined, undefined>['components'] = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        padding: '0.5rem',
        width: '33%',
        display: 'flex',
        flex: 'none',
        alignContent: 'stretch',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  ),
}

  const ItemWrapper = ({ children, ...props }:  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
    <div
      {...props}
      style={{
        display: "flex",
        flex: 1,
        textAlign: "center",
        padding: "1rem 1rem",
        border: "1px solid gray",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      <VirtuosoGrid
        style={{ height: "80vh", width: "100%" }}
        totalCount={items.length}
        components={gridComponents}
        itemContent={(index) => (
          <ItemWrapper>
            {items[index]}
          </ItemWrapper>
        )}
      />
    </>
  );
}
