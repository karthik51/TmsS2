FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["TMS.Services/TMS.Gateway/TMS.Gateway.csproj", "TMS.Services/TMS.Gateway/"]
COPY ["TMS.DAL/TMS.DAL.csproj", "TMS.DAL/"]
COPY ["TMS.Repositories/TMS.IRepositories.csproj", "TMS.Repositories/"]
COPY ["TMS.Entities/TMS.Entities.csproj", "TMS.Entities/"]
RUN dotnet restore "TMS.Services/TMS.Gateway/TMS.Gateway.csproj"
COPY . .
WORKDIR "/src/TMS.Services/TMS.Gateway"
RUN dotnet build "TMS.Gateway.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "TMS.Gateway.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TMS.Gateway.dll"]