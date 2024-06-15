

export const customTOC = (toc: any) => {
    try {
      const { children } = toc;
      const childrenOfChildren = children?.[0]?.children;
      if (!children?.length || !childrenOfChildren?.length) return null;
    } catch (e) {}
    return {
      type: 'element',
      tagName: 'div',
      properties: { className: 'toc bg-muted rounded-sm p-4 mt-6' },
      children: [
        {
          type: 'element',
          tagName: 'p',
          properties: { className: 'title' },
          children: [
            {
              type: 'text',
              value: 'Table of Contents',
            },
          ],
        },
        ...(toc.children || []),
        // {
        //   type: 'element',
        //   tagName: 'div',
        //   properties: { className: 'w-full h-4 flex justify-center items-center' },
        //   children: [
        //     {
        //       type: 'element',
        //       tagName: 'p',
        //       properties: { className: 'text-xs text-muted-foreground uppercase' },
        //       children: [
        //         {
        //           type: 'text',
        //           value: 'Collapse',
        //         },
        //       ],
        //     }
        //   ]
        // }
      ],
    };
  };