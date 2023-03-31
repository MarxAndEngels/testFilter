export default {
    methods: {
        declension({count, one, few, many}) {
            const isFloat = Math.round(count) !== count;
            let declension = many;
            if (isFloat) {
                declension = few;
            } else {
                const units = Math.abs(count % 10);
                const tens = Math.abs(count % 100);
                if (units === 1 && tens !== 11) {
                    declension = one;
                } else if (2 <= units && units <= 4 && (tens < 10 || 20 <= tens)) {
                    declension = few;
                }
            }
            return declension;
        }
    }
}
