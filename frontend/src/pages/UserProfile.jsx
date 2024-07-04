import React from "react"
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material"
import { GitHub, Facebook, Twitter, LinkedIn, Edit } from "@mui/icons-material"
import styled from "@emotion/styled"

const StyledCard = styled(Card)`
  position: relative;
  max-width: 600px;
  margin: auto;
  padding: 20px;
`

const EditButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: gray;
`

const UserProfile = ({
  userProfile,
  onEditClick = () => {},
  editable = true,
}) => {
  if (!userProfile) {
    return <Typography variant="h6">No user profile available</Typography>
  }

  return (
    <StyledCard>
      {editable && onEditClick && (
        <EditButton onClick={onEditClick}>
          <Edit />
        </EditButton>
      )}
      <CardContent className="bg-white dark:bg-dark-white text-gray-300 dark:text-dark-gray-300">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Avatar
            src={userProfile.avatar}
            alt={userProfile.full_name}
            style={{ width: 100, height: 100, marginRight: 20 }}
          />
          <div>
            <Typography variant="h4">{userProfile.full_name}</Typography>
            <Typography variant="body1">
              {userProfile.bio || "No bio available"}
            </Typography>
          </div>
        </div>
        <Divider sx={{ backgroundColor: "grey" }} />
        <div className="mt-5 mb-5">
          <Typography variant="body1">
            <strong>Github username:</strong>{" "}
            {userProfile.username || "Not provided"}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {userProfile.email || "Not provided"}
          </Typography>
          <Typography variant="body1">
            <strong>Location:</strong> {userProfile.location || "Not provided"}
          </Typography>
          <Typography variant="body1">
            <strong>Cohort:</strong> {userProfile.cohort || "Not provided"}
          </Typography>
        </div>
        <Divider sx={{ backgroundColor: "grey" }} />
        <div className="mt-5 flex justify-center gap-10">
          {/* <div style={{ display: "flex", justifyContent: "center", gap: 10 }}> */}
          <a
            href={`https://github.com/${userProfile.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub fontSize="large" />
          </a>
          {userProfile.facebook && (
            <a
              href={userProfile.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook fontSize="large" />
            </a>
          )}
          {userProfile.twitter && (
            <a
              href={userProfile.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter fontSize="large" />
            </a>
          )}
          {userProfile.linkedin && (
            <a
              href={userProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn fontSize="large" />
            </a>
          )}
        </div>
      </CardContent>
    </StyledCard>
  )
}

export default UserProfile
