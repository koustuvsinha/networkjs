NODE=$(which node || true)
NODE_VERSION=6.7.0

if [[ -n "${NODE}" ]]; then
  echo $(dirname ${NODE})
else
  if [[ ! -d "nvm" ]]; then
    git clone git://github.com/creationix/nvm.git >/dev/null
  fi
  mkdir -p .nvm
  export NVM_DIR=$( (cd .nvm && pwd) )
  unset NVM_PATH
  unset NVM_BIN

  # Load nvm into current shell
  . nvm/nvm.sh >/dev/null

  # Install and use the requested version of node
  nvm install ${NODE_VERSION} >/dev/null
  nvm alias default ${NODE_VERSION} >/dev/null
  nvm use default >/dev/null

  # Find and output node's bin directory
  NODE=$(which node)
  echo $(dirname ${NODE})
fi
# Install networkjs
npm install -g networkjs
