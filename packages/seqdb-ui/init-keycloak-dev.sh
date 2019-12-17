# Initialize Keycloak dev instance:

cd /opt/jboss/keycloak/bin

# Log in using the default keycloak user for the master realm:
./kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user $KEYCLOAK_USER --password $KEYCLOAK_PASSWORD

# Create dina-realm:
./kcadm.sh create realms -s realm=dina-realm -s enabled=true

# Create "user" role:
./kcadm.sh create realms/dina-realm/roles -s name=user
# Make "user" a default role:
./kcadm.sh update realms/dina-realm -s 'defaultRoles=[ "offline_access", "uma_authorization", "user" ]'

# Create "admin" role:
ADMIN_ROLE=$( ./kcadm.sh create realms/dina-realm/roles -s name=admin -o --fields=id,name )

# Create public "dina" client:
./kcadm.sh create realms/dina-realm/clients -s clientId=dina -s publicClient=true -s 'redirectUris=["*"]'

# Create initial "Admin" user with password "Admin":
ADMIN_USER_ID=$(
./kcadm.sh create realms/dina-realm/users -i -f - << EOF
{
  "username": "Admin",
  "enabled": true,
  "credentials": [{ "type": "password", "value": "Admin" }]
}
EOF
)

# Give "Admin" user dina-realm's admin role:
./kcadm.sh create realms/dina-realm/users/$ADMIN_USER_ID/role-mappings/realm -f - << EOF
[$ADMIN_ROLE]
EOF

# Create initial "User" user with password "Admin":
./kcadm.sh create realms/dina-realm/users -f - << EOF
{
  "username": "User",
  "enabled": true,
  "credentials": [{ "type": "password", "value": "User" }]
}
EOF
