import { Project } from '@/payload-types';
import React, { Fragment } from 'react';
import { Text } from 'slate';

type Props = Extract<Project['layout'][0], { blockType: 'content' }>

export const Content = (props : Props) => {
    const { columns } = props;

    return (
        <div className='grid auto-cols-auto gap-4'>
            {columns?.map((column, index) => {
                const { content } = column;
                return (
                    <div key={index}>
                        {content?.root.children.map((node, i) => {
                            if (Text.isText(node)) {
                                let text = <p>{node.text as string}</p>

                                if (node.bold) {
                                    text = <strong key={i}>{text}</strong>
                                }

                                if (node.code) {
                                    text = <code key={i}>{text}</code>
                                }

                                if (node.italic) {
                                    text = <em key={i}>{text}</em>
                                }

                                if (node.underline) {
                                    text = <span key={i} className='underline'>{text}</u>
                                }

                                if (node.strikethrough) {
                                    text = <span key={i} className='strikethrough'>{text}</span>
                                }

                                return <Fragment key={i}>{text}</Fragment>
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}