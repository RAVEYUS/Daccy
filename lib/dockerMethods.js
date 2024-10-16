export const dockerNodes = {
    name: "Docker",
    children: [
      {
        name: "Basic Commands",
        children: [
          { name: "docker build" },
          { name: "docker run" },
          { name: "docker pull" },
          { name: "docker push" },
          { name: "docker ps" },
          { name: "docker stop" },
          { name: "docker start" },
          { name: "docker exec" },
          { name: "docker logs" },
          { name: "docker rm" },
          { name: "docker rmi" },
          { name: "docker images" },
        ],
      },
      {
        name: "Network Commands",
        children: [
          { name: "docker network ls" },
          { name: "docker network create" },
        ],
      },
      {
        name: "Volume Commands",
        children: [
          { name: "docker volume ls" },
          { name: "docker volume create" },
        ],
      },
      {
        name: "Docker Compose",
        children: [
          { name: "docker-compose up" },
          { name: "docker-compose down" },
          { name: "docker-compose build" },
          { name: "docker-compose ps" },
          { name: "docker-compose exec" },
          { name: "docker-compose logs" },
        ],
      },
      {
        name: "Dockerfile",
        children: [{ name: "Dockerfile" }],
      },
    ],
  };
  
  const dockerTopicInfoMap = {
    "docker build": {
      description: "The `docker build` command creates a new image from the instructions in a Dockerfile.",
      syntax: "docker build [OPTIONS] PATH | URL | -",
      example: `docker build -t my-image:latest .`,
    },
    "docker run": {
      description: "The `docker run` command creates and starts a new container from a specified image.",
      syntax: "docker run [OPTIONS] IMAGE [COMMAND] [ARG...]",
      example: `docker run -d -p 80:80 my-image`,
    },
    "docker pull": {
      description: "The `docker pull` command downloads an image from a Docker registry.",
      syntax: "docker pull [OPTIONS] NAME[:TAG|@DIGEST]",
      example: `docker pull nginx:latest`,
    },
    "docker push": {
      description: "The `docker push` command uploads a local image to a specified Docker registry.",
      syntax: "docker push [OPTIONS] NAME[:TAG]",
      example: `docker push my-repo/my-image:latest`,
    },
    "docker ps": {
      description: "The `docker ps` command lists running containers.",
      syntax: "docker ps [OPTIONS]",
      example: `docker ps -a`,
    },
    "docker stop": {
      description: "The `docker stop` command stops a running container by sending a SIGTERM signal.",
      syntax: "docker stop [OPTIONS] CONTAINER [CONTAINER...]",
      example: `docker stop my-container`,
    },
    "docker start": {
      description: "The `docker start` command starts one or more stopped containers.",
      syntax: "docker start [OPTIONS] CONTAINER [CONTAINER...]",
      example: `docker start my-container`,
    },
    "docker exec": {
      description: "The `docker exec` command runs a new command in a running container.",
      syntax: "docker exec [OPTIONS] CONTAINER COMMAND [ARG...]",
      example: `docker exec -it my-container /bin/bash`,
    },
    "docker logs": {
      description: "The `docker logs` command fetches the logs of a container.",
      syntax: "docker logs [OPTIONS] CONTAINER",
      example: `docker logs my-container`,
    },
    "docker rm": {
      description: "The `docker rm` command removes one or more containers.",
      syntax: "docker rm [OPTIONS] CONTAINER [CONTAINER...]",
      example: `docker rm my-container`,
    },
    "docker rmi": {
      description: "The `docker rmi` command removes one or more images from the local machine.",
      syntax: "docker rmi [OPTIONS] IMAGE [IMAGE...]",
      example: `docker rmi my-image`,
    },
    "docker images": {
      description: "The `docker images` command lists the locally stored images.",
      syntax: "docker images [OPTIONS] [REPOSITORY[:TAG]]",
      example: `docker images`,
    },
    "docker network ls": {
      description: "The `docker network ls` command lists all the networks Docker knows about.",
      syntax: "docker network ls [OPTIONS]",
      example: `docker network ls`,
    },
    "docker network create": {
      description: "The `docker network create` command creates a new network.",
      syntax: "docker network create [OPTIONS] NETWORK",
      example: `docker network create my-network`,
    },
    "docker volume ls": {
      description: "The `docker volume ls` command lists all Docker volumes.",
      syntax: "docker volume ls [OPTIONS]",
      example: `docker volume ls`,
    },
    "docker volume create": {
      description: "The `docker volume create` command creates a new volume.",
      syntax: "docker volume create [OPTIONS] VOLUME",
      example: `docker volume create my-volume`,
    },
    "docker-compose up": {
      description: "The `docker-compose up` command builds, creates, starts, and attaches to containers defined in a `docker-compose.yml` file.",
      syntax: "docker-compose up [OPTIONS] [SERVICE...]",
      example: `docker-compose up -d`,
    },
    "docker-compose down": {
      description: "The `docker-compose down` command stops and removes containers, networks, volumes, and images created by `docker-compose up`.",
      syntax: "docker-compose down [OPTIONS]",
      example: `docker-compose down`,
    },
    "docker-compose build": {
      description: "The `docker-compose build` command builds or rebuilds services defined in a `docker-compose.yml` file.",
      syntax: "docker-compose build [OPTIONS] [SERVICE...]",
      example: `docker-compose build my-service`,
    },
    "docker-compose ps": {
      description: "The `docker-compose ps` command lists containers started by docker-compose.",
      syntax: "docker-compose ps [OPTIONS] [SERVICE...]",
      example: `docker-compose ps`,
    },
    "docker-compose exec": {
      description: "The `docker-compose exec` command runs a new command in a running container from a docker-compose managed service.",
      syntax: "docker-compose exec [OPTIONS] SERVICE COMMAND [ARGS...]",
      example: `docker-compose exec my-service /bin/bash`,
    },
    "docker-compose logs": {
      description: "The `docker-compose logs` command shows the logs of services started by docker-compose.",
      syntax: "docker-compose logs [OPTIONS] [SERVICE...]",
      example: `docker-compose logs my-service`,
    },
    "Dockerfile": {
      description: "A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image.",
      syntax: "N/A",
      example: `# Sample Dockerfile
  FROM node:14
  WORKDIR /app
  COPY . .
  RUN npm install
  CMD ["npm", "start"]`,
    },
  };
  
  export const getDockerTopicInfo = (topicName) => {
    return dockerTopicInfoMap[topicName] || { description: "Information not available for this topic." };
  };
  