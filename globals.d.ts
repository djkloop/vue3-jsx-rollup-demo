declare module '*.vue' {
	import {defineComponent} from 'vue';
	let component: ReturnType<typeof defineComponent>;
	export default component;
}