import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <h4>Dashboard</h4>
      <NavLink
        to="/dashboard/user/profile"
        className="list-group-item list-group-item-action"
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/user/orders"
        className="list-group-item list-group-item-action"
      >
        Order
      </NavLink>
    </div>
  );
};

export default UserMenu;
