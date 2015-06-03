push: 
	git add -A
	git commit -m "auto"
	git push origin master
all:
	git add -A
	git commit -m "auto"
	git push origin master
	git tag -a $(t) -m 'tag' && git push origin $(t)
tag:
	git tag -a $(t) -m 'tag' && git push origin $(t)
