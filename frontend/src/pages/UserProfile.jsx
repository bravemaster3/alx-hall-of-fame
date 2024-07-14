import React from "react"
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material"
import {
  GitHub,
  Facebook,
  Twitter,
  LinkedIn,
  Edit,
  Delete,
  Close,
} from "@mui/icons-material"
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
  onCloseClick = () => {},
  editable = true,
  closable = true,
}) => {
  if (!userProfile) {
    return <Typography variant="h6">No user profile available</Typography>
  }

  return (
    <StyledCard className="bg-white dark:bg-dark-white">
      <div className="flex justify-between items-end">
        {editable && onEditClick && (
          <EditButton onClick={onEditClick}>
            <Edit className="text-gray-700 dark:text-gray-50" />
          </EditButton>
        )}
        {closable && (
          <Close
            onClick={onCloseClick}
            className="text-gray-700 dark:text-gray-50"
          />
        )}
      </div>
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
            style={{
              width: 80,
              height: 80,
              maxWidth: "15vw",
              maxHeight: "15vw",
              marginRight: 20,
            }}
          />
          {/* <Avatar
            src={userProfile.avatar}
            alt={userProfile.full_name}
            className="w-100 h-100 mr-5"
          /> */}
          <div>
            <Typography variant="h5">
              {userProfile.full_name || userProfile.username}
            </Typography>
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
        <div className="mt-5 flex justify-center gap-5">
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
