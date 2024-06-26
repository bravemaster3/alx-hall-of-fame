import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

export default function Navbar() {
  return (
    <div className="flex-grow">
      <AppBar position="static" className="bg-blue-600">
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              className="mr-2"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" className="text-white">
              News
            </Typography>
          </div>
          <Button color="inherit" className="text-white">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
