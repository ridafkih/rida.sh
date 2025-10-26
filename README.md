# rida.sh

This is a project which utilizes Cloudflare Tunnels and a Bun-hosted REST API to expose services & configurations that are used by internal systems. Particularly those hosted (on my homelab)[https://github.com/ridafkih/homelab].

## Prerequisites

- [Docker](https://docs.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/gettingstarted/)
- [Cloudflare](https://www.cloudflare.com/)

## Configuration

First, copy over the `.env` file and populate the environment variables defined within. We'll need to ensure we have a [Cloudflare tunnel token](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) for this step.

```bash
cp .env.example .env
```

Once that's done, we can just run the service.

```bash
docker compose up
```
