import { forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

const NavLinkWrapper = forwardRef(
  (props: NavLinkProps, ref: React.Ref<HTMLAnchorElement> | undefined) => {
    // @ts-ignore
    const { ownerState, ...other } = props;

    return <NavLink {...other} ref={ref} />;
  }
);

export default NavLinkWrapper;
