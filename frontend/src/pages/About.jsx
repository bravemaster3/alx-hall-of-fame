// // // src/pages/About.jsx
// // import React from "react"

// // const About = () => {
// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold">About Page</h1>
// //       <p>Learn more about us on this page.</p>
// //     </div>
// //   )
// // }

// // export default About

// import React from "react"
// import {
//   Container,
//   Typography,
//   Paper,
//   Box,
//   Avatar,
//   Grid,
//   IconButton,
// } from "@mui/material"
// import { GitHub, LinkedIn, Twitter } from "@mui/icons-material"
// import { useTheme } from "@mui/material/styles"

// const About = () => {
//   const theme = useTheme()

//   return (
//     <Container maxWidth="md" style={{ marginTop: theme.spacing(8) }}>
//       <Paper elevation={3} style={{ padding: theme.spacing(4) }}>
//         <Typography variant="h4" gutterBottom align="center">
//           About ALX Hall of Fame
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Welcome to the ALX Hall of Fame, a dynamic platform designed for
//           software developers, particularly the ALX SE community to showcase
//           their talent, inspire others, and find new collaborators. At ALX Hall
//           of Fame, we believe in the power of community and collaboration. Our
//           mission is to create a vibrant space where developers from around the
//           world can present their projects, share their expertise, and connect
//           with like-minded individuals. Whether you are looking to highlight
//           your latest achievements, seek inspiration for your next project, or
//           discover potential collaborators, the ALX Hall of Fame is the perfect
//           place for you.
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Here, you can explore a diverse range of innovative projects, learn
//           from the experiences of others, and contribute to a growing network of
//           talented professionals. We aim to foster an environment where ideas
//           can flourish, partnerships can form, and everyone can grow together in
//           their journey as developers. Join us in celebrating excellence in
//           software development, pushing the boundaries of technology, and
//           building meaningful connections within our global community. Your next
//           great opportunity could be just a click away!
//         </Typography>

//         {/* Team Members Section */}
//         <Typography
//           variant="h5"
//           gutterBottom
//           style={{ marginTop: 24, textAlign: "center" }}
//         >
//           Our Team
//         </Typography>
//         <Grid container spacing={2} max-width="100%">
//           {/* Example Team Member */}
//           <Grid
//             item
//             xs={12}
//             md={4}
//             align="center"
//             width="100%"
//             style={{
//               marginTop: 24,
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Avatar
//               alt="Koffi Dodji Noumonvi"
//               src="https://avatars.githubusercontent.com/u/39010414?v=4"
//               style={{ width: 100, height: 100 }}
//             />
//             <Typography variant="subtitle1" style={{ marginTop: 8 }}>
//               Koffi Dodji Noumonvi
//             </Typography>
//             <Typography variant="subtitle2" style={{ marginTop: 8 }}>
//               Full Stack Software Engineer
//             </Typography>
//             <Box>
//               <IconButton
//                 href="https://github.com/bravemaster3"
//                 target="_blank"
//                 rel="noopener"
//               >
//                 <GitHub />
//               </IconButton>
//               <IconButton
//                 href="https://www.linkedin.com/in/koffi-dodji-noumonvi-8a578a89/"
//                 target="_blank"
//                 rel="noopener"
//               >
//                 <LinkedIn />
//               </IconButton>
//               <IconButton
//                 href="https://x.com/bravemaster3"
//                 target="_blank"
//                 rel="noopener"
//               >
//                 <Twitter />
//               </IconButton>
//             </Box>
//           </Grid>

//           {/* Add more team members as needed */}
//         </Grid>
//       </Paper>
//     </Container>
//   )
// }

// export default About

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

const About = () => {
  const theme = useTheme()

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: theme.spacing(8),
        // minHeight: "100vh", // Ensure container takes full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center content vertically
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: theme.spacing(4), textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          About ALX Hall of Fame
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the ALX Hall of Fame, a dynamic platform designed for
          software developers, particularly the ALX SE community to showcase
          their talent, inspire others, and find new collaborators. At ALX Hall
          of Fame, we believe in the power of community and collaboration. Our
          mission is to create a vibrant space where developers from around the
          world can present their projects, share their expertise, and connect
          with like-minded individuals. Whether you are looking to highlight
          your latest achievements, seek inspiration for your next project, or
          discover potential collaborators, the ALX Hall of Fame is the perfect
          place for you.
        </Typography>
        <Typography variant="body1" paragraph>
          Here, you can explore a diverse range of innovative projects, learn
          from the experiences of others, and contribute to a growing network of
          talented professionals. We aim to foster an environment where ideas
          can flourish, partnerships can form, and everyone can grow together in
          their journey as developers. Join us in celebrating excellence in
          software development, pushing the boundaries of technology, and
          building meaningful connections within our global community. Your next
          great opportunity could be just a click away!
        </Typography>

        {/* Team Members Section */}
        <Typography variant="h5" gutterBottom style={{ marginTop: 24 }}>
          Our Team
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Example Team Member */}
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

          {/* Add more team members as needed */}
        </Grid>
      </Paper>
    </Container>
  )
}

export default About
