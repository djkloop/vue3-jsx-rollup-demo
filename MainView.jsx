import {defineComponent, inject, toRef, toRefs} from 'vue';
import "./style.css";

const NAME = 'fcSelect';


export default defineComponent({
    name: NAME,
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        type: String,
    },
    emits: ['update:modelValue', 'fc:subform'],
    setup(props) {
        const {options = []} = toRefs(inject('formCreate'));
        const value = toRef(props, 'modelValue');
        return {
            options,
            value
        }
    },
    render() {
        return <ElSelect {...this.$attrs} modelValue={this.value}
            onUpdate:modelValue={(v) => this.$emit('update:modelValue', v)}
            >{this.options.map((props, index) => {
                return <ElOption {...props} key={'' + index + props.value}/>
            })}{this.$slots.default?.()}</ElSelect>;
    }
});