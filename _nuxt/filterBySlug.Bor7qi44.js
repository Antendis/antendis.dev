const l = (r, e) => r.filter(t => e.includes(t.slug)).sort((t, f) => e.indexOf(t.slug) - e.indexOf(f.slug));
export {
    l as f
};