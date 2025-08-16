import {AppNavBar} from '@blog/components/navbar';
import {VerticalNavigation} from '@blog/components/vertical-navigation';
import LargeFooter from '../../components/footer/large-footer';
import type {PropsWithChildren} from "react";

export default function MainLayout({
                                       children,
                                   }: Readonly<PropsWithChildren>) {
    return (
        <>
            <AppNavBar/>
            <VerticalNavigation />
            <div id='main'>{children}</div>
            <LargeFooter/>
        </>
    );
}