FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["Gateway.Api/Gateway.Api.csproj", "Gateway.Api/"]
RUN dotnet restore "Gateway.Api/Gateway.Api.csproj"
COPY . .
WORKDIR "/src/Gateway.Api"
RUN dotnet build "Gateway.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Gateway.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Gateway.Api.dll"]
