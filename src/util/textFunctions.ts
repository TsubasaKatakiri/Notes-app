export const extractTags = (textString: string) : string => {
    const tags = new Set(textString.split(' ')
                                   .filter((word : string) => word.startsWith('#'))
                                   .map((tag : string) => tag.slice(1).toLocaleLowerCase()))
    return Array.from(tags).join(' ');
}

export const formatTags = (tags: string[]) : string[] => {
    return tags.map((tag : string) => {
        return `#${tag}`;
    })
}

export const inlineTags = (tags: string[]) : string => {
    return tags.join(' ');
}