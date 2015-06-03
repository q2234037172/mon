all:
	git add -A
	git commit -m "auto"
	git push origin master
	git tag -a $(t) -m 'tag' && git push origin $(t)
push: 
	git add *
	git commit -m "auto"
	git push origin master
tag:
	git tag -a $(t) -m 'tag' && git push origin $(t)
