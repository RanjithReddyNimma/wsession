import {WSMeta} from "./meta/wsMeta";
import {ParamMeta} from "./meta/paramMeta";
import {HandlerMeta} from "./meta/handlerMeta";
import {InjectMeta} from "./meta/injectMeta";

export interface IWSOption {
    getInstance: () => any;

    [key: string]: any;
}

export function WS(option?: IWSOption) {
    return (constructor: Function) => {
        WSMeta.create(constructor, option);
    };
}

export function WSInject(fieldConstructor: Function) {
    return function (object: Object, propertyName: string) {
        InjectMeta.create(object, propertyName, fieldConstructor);
    };
}

export function WSCtx() {
    return function (object: Object, methodName: string, index: number) {
        ParamMeta.create(object, methodName, index, "", true);
    };
}

export function WSParam(key: string) {
    return function (object: Object, methodName: string, index: number) {
        ParamMeta.create(object, methodName, index, key);
    };
}


export function WSHandler(code: number, rspCode?: number) {
    return (object: Object,
            methodName: string,
            descriptor: TypedPropertyDescriptor<(...arg: any[]) => Promise<any>>
    ) => {
        HandlerMeta.create(object, methodName, code, rspCode);
    };
}

