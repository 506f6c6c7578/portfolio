const fillRoles: Record<string, string> = {
    "#6c63ff": "accent",
    "#ff6584": "accent",
    "#090814": "ink",
    "#2f2e41": "ink",
    "#3f3d56": "ink",
    "#fff": "surface",
    "#ffffff": "surface",
    "#fffeff": "surface",
    "#ccc": "muted",
    "#cacaca": "muted",
    "#d6d6e3": "muted",
    "#e6e6e6": "muted",
    "#f0f0f0": "muted",
    "#f2f2f2": "muted"
};

export function themeIllustration(svg: string): string {
    return svg
        .replace("<svg ", '<svg class="illustration__svg" aria-hidden="true" focusable="false" ')
        .replace(/fill="(#[0-9a-f]{3,6})"/gi, (attribute, color: string) => {
            const role = fillRoles[color.toLowerCase()];
            return role ? `class="illustration__${role}"` : attribute;
        });
}
