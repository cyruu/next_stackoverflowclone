import { List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Person4Icon from "@mui/icons-material/Person4";
import axios from "axios";
import { useRouter } from "next/navigation";
const ProfileOptions = () => {
  const router = useRouter();
  //logout
  async function handleLogout() {
    try {
      const res = await axios.get("/api/users/logout");
      console.log("logout res", res);
      if (res.data.statusCode == 200) {
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div className="absolute  top-12 left-[-15px] z-10 border border-gray-200">
      <Paper>
        <List className=" w-28 m-0 p-0 sm:w-32">
          <ListItem className="p-2">
            <Person4Icon className="mr-2" />
            <Typography sx={{ fontSize: ".8rem" }}>Profile</Typography>
          </ListItem>
          <button
            className="cursor-pointer w-full p-0 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <ListItem className="p-2">
              <LogoutIcon className="mr-2" />
              <Typography sx={{ fontSize: ".8rem" }}>Logout</Typography>
            </ListItem>
          </button>
        </List>
      </Paper>
    </div>
  );
};

export default ProfileOptions;
