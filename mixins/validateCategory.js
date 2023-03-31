export default {
    validate(ctx) {
        return ctx.params.category === ctx.store.getters['settings/catalogRoute'];
    }
}