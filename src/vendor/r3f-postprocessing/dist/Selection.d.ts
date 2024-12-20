import * as THREE from 'three';
import React from 'react';
export type Api = {
    selected: THREE.Object3D[];
    select: React.Dispatch<React.SetStateAction<THREE.Object3D[]>>;
    enabled: boolean;
};
export type SelectApi = JSX.IntrinsicElements['group'] & {
    enabled?: boolean;
};
export declare const selectionContext: React.Context<Api | null>;
export declare function Selection({ children, enabled }: {
    enabled?: boolean;
    children: React.ReactNode;
}): JSX.Element;
export declare function Select({ enabled, children, ...props }: SelectApi): JSX.Element;
