#!/bin/sh -eu

cat <<EOF >> $HOME/.ssh/config
  #User sketchdev-developer
  VerifyHostKeyDNS yes
  StrictHostKeyChecking no
  ForwardAgent yes
EOF

eval $(ssh-agent)
ssh-add
