import Alertx from './alert.vue';

Alertx.install = (Vue) => {
    const _constructor = Vue.extend(Alertx);

    Vue.prototype.$_alert = _ => {
        const instance = new _constructor();
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        instance.vm.show();
    };
};

export {
    Alertx
};
