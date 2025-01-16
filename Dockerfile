# ======================================================================
# Copyright (C) 2025 - lzaycoe (Lazy Code)
# ======================================================================
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
# ======================================================================

FROM node:20.17.0-alpine AS base
RUN addgroup -S frontend && \
    adduser -S frontend -G frontend

#--------------------------------------------------

FROM base AS base-dev
RUN npm install -g --ignore-scripts pnpm

#--------------------------------------------------

FROM base-dev AS build
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build

#--------------------------------------------------

FROM base AS production
ARG NODE_ENV=production
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
USER frontend
ENTRYPOINT ["node", "server.js"]
EXPOSE 3000
