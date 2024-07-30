import React, { useState } from "react"
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material"
import axios from "axios"

const GitHubRepoSearch = ({ username, onSelectRepo }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value)

    if (e.target.value.length > 2) {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        )
        setRepos(
          response.data.filter((repo) =>
            repo.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      } catch (error) {
        console.error("Error fetching repositories:", error)
      } finally {
        setLoading(false)
      }
    } else {
      setRepos([])
    }
  }

  return (
    <Box position="relative" width="100%">
      <TextField
        fullWidth
        label="Search GitHub Repos"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: loading ? <CircularProgress size={20} /> : null,
        }}
      />
      {repos.length > 0 && (
        <List
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "white",
            zIndex: 1,
            border: "1px solid #ccc",
          }}
        >
          {repos.map((repo) => (
            <ListItem button key={repo.id} onClick={() => onSelectRepo(repo)}>
              <ListItemText primary={repo.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default GitHubRepoSearch
