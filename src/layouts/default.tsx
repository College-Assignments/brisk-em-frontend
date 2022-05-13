import { ReactNode } from 'react';

const Default = ({ children }: { children: ReactNode }) => <>{children}</>;

export const getLayout = (page: any) => <Default>{page}</Default>;

export default Default;
