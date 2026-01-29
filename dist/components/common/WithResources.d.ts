import { DefaultResource } from '../../types';
interface WithResourcesProps {
    renderChildren(resource: DefaultResource): React.ReactNode;
}
declare const WithResources: ({ renderChildren }: WithResourcesProps) => import("react/jsx-runtime").JSX.Element;
export { WithResources };
