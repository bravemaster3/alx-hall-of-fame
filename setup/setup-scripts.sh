# This setup instructions file is for Oracle VM, which is running a centos it seems

# Update the package index
sudo dnf update -y

# Install required packages
sudo dnf install -y dnf-plugins-core

# Add the Docker repository
sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker
sudo dnf install -y docker-ce docker-ce-cli containerd.io


# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# chek the status of docker like so:
sudo systemctl status docker


## Run a test container
# sudo docker run hello-world

## If Docker does not start or if you encounter issues, check the Docker logs for more information:
# sudo journalctl -u docker
