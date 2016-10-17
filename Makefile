all: install_node.sh uninstall_node.sh
	chmod 755 install_node.sh
	chmod 755 uninstall_node.sh
install:
	./install_node.sh
clean:
	./uninstall_node.sh	
