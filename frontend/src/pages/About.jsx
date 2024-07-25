import React from "react"
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material"
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
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
        // background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: theme.spacing(4),
        borderRadius: theme.spacing(1),
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

        <Typography variant="h5" gutterBottom style={{ marginTop: 24 }}>
          Team
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Koffi Dodji Noumonvi"
              src="https://avatars.githubusercontent.com/u/39010414?v=4"
              style={{ width: 100, height: 100 }}
            />
            <Typography variant="subtitle1" style={{ marginTop: 8 }}>
              Koffi Dodji Noumonvi
            </Typography>
            <Typography variant="subtitle2" style={{ marginTop: 8 }}>
              Full Stack Software Engineer
            </Typography>
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
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default About
