import React from "react"
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Grid,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material"
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material"
// import { useTheme } from "@mui/material/styles"
import { FaReact, FaDocker } from "react-icons/fa"
import {
  SiTailwindcss,
  SiPostgresql,
  SiDjango,
  SiNginx,
  SiGit,
} from "react-icons/si"
import { DiMaterializecss } from "react-icons/di"

const About = () => {
  const theme = useTheme()

  const techStacks = [
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
    { name: "Django", icon: <SiDjango />, color: "#092E20" },
    { name: "React JS", icon: <FaReact />, color: "#61DBFB" },
    { name: "Material UI", icon: <DiMaterializecss />, color: "#0081CB" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38B2AC" },
    { name: "Nginx", icon: <SiNginx />, color: "#269539" },
    { name: "GIT", icon: <SiGit />, color: "#F05032" },
    { name: "Docker Compose", icon: <FaDocker />, color: "#0db7ed" },
  ]

  return (
    <Container
      maxWidth="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        minHeight: `calc(100vh - 60px - ${
          theme.breakpoints.down("md") ? "54px" : "64px"
        })`, // Adjust height calculation
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: theme.spacing(4),
          textAlign: "center",
          backgroundColor: "rgba(240, 240, 240, 0.7)",
          borderRadius: theme.spacing(1),
        }}
      >
        <Typography variant="h4" gutterBottom>
          About ALX Hall of Fame
        </Typography>
        <Typography
          variant="body1"
          paragraph
          style={{ textAlign: "justify", marginBottom: theme.spacing(3) }}
        >
          <Box
            component="span"
            sx={{
              background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            Welcome to the ALX Hall of Fame,
          </Box>{" "}
          a dynamic platform designed for software developers, particularly the
          ALX SE community, to showcase their talent, inspire others, and find
          new collaborators. At ALX Hall of Fame, we believe in the power of
          community and collaboration. Our mission is to create a vibrant space
          where developers from around the world can present their projects,
          share their expertise, and connect with like-minded individuals.
          Whether you are looking to highlight your latest achievements, seek
          inspiration for your next project, or discover potential
          collaborators, the ALX Hall of Fame is the perfect place for you.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          style={{ textAlign: "justify", marginBottom: theme.spacing(3) }}
        >
          Here, you can explore a diverse range of innovative projects, learn
          from the experiences of others, and contribute to a growing network of
          talented professionals. We aim to foster an environment where ideas
          can flourish, partnerships can form, and everyone can grow together in
          their journey as developers. Join us in celebrating excellence in
          software development, pushing the boundaries of technology, and
          building meaningful connections within our global community. Your next
          great opportunity could be just a click away!
        </Typography>

        <Typography variant="h5" gutterBottom style={{ marginTop: 24 }}>
          Tech Stacks
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {techStacks.map((stack, index) => (
            <Grid
              item
              xs={4}
              md={2}
              key={index}
              style={{ textAlign: "center" }}
            >
              <Box
                style={{
                  color: stack.color,
                  fontSize: 40,
                  marginBottom: theme.spacing(1),
                }}
                title={stack.name}
              >
                {stack.icon}
              </Box>
              <Typography variant="body1">{stack.name}</Typography>
            </Grid>
          ))}
        </Grid>

        <Divider
          sx={{
            width: "100%",
            margin: theme.spacing(4, 0),
            borderBottomWidth: 2,
          }}
        />

        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: {
              xs: "column", // stack vertically on extra small screens
              md: "row", // stack horizontally on medium and larger screens
            },
          }}
        >
          <Grid
            item
            xs={12}
            md={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Avatar
              alt="Koffi Dodji Noumonvi"
              src="https://avatars.githubusercontent.com/u/39010414?v=4"
              style={{
                width: "100%",
                maxWidth: 150,
                height: "auto",
                marginRight: { xs: 0, md: theme.spacing(1) },
                marginBottom: theme.spacing(2),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: { xs: "center", md: "left" },
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h6">Koffi Dodji Noumonvi</Typography>
              <Typography variant="subtitle1">
                Full Stack Software Engineer
              </Typography>
              <Box
                component="a"
                href="https://www.buymeacoffee.com/bravemaster"
                target="_blank"
                rel="noopener"
                sx={{
                  alignItems: "center",
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  marginTop: theme.spacing(1),
                }}
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{ height: 40, marginRight: theme.spacing(1) }}
                />
              </Box>
              <Box>
                <IconButton
                  href="https://github.com/bravemaster3"
                  target="_blank"
                  rel="noopener"
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/koffi-dodji-noumonvi-8a578a89/"
                  target="_blank"
                  rel="noopener"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://x.com/bravemaster3"
                  target="_blank"
                  rel="noopener"
                >
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default About
