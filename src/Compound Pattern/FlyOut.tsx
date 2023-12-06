import React from 'react';

type FlyOutValue = {
    open: boolean;
    toggle: React.Dispatch<React.SetStateAction<boolean>>
    ;
} | null;
const FlyOutContext = React.createContext<FlyOutValue>(null);

type PropsWithChildren<T extends object> = T & { children: React.ReactNode };
type PropsWithChildrenComponent<T extends object= {}> = React.FC<PropsWithChildren<T>>;
interface FlyOut {
    Toggle: PropsWithChildrenComponent;
    List: PropsWithChildrenComponent;
    Item: PropsWithChildrenComponent;
}
export const FLyOut: PropsWithChildrenComponent & FlyOut = (props) => {
    const [ open, toggle ] = React.useState(false);

    return <FlyOutContext.Provider value={{ open, toggle }}>
        {props.children}
    </FlyOutContext.Provider>;
};

const Toggle: PropsWithChildrenComponent = () => {
    const { open, toggle } = React.useContext(FlyOutContext)!;

    return <button onClick={() => toggle(!open)}>{open ? 'Close' : 'Open'}</button>;
};

const List: PropsWithChildrenComponent = (props) => {
    const { open } = React.useContext(FlyOutContext)!;
    return open && <ul>{props.children}</ul>
};

const Item: PropsWithChildrenComponent = (props) => {
    return <li>{props.children}</li>
};

FLyOut.Toggle = Toggle;
FLyOut.List = List;
FLyOut.Item = Item;
