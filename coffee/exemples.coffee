# Exemples coffeescript

# Déclaration

session = "Javascript dans tous ses états"

# Fonctions

a = (a,b) -> a+b

fibonacci = (n) ->
				if n = 0 or n = 1 then 1 else fibonacci (n - 1) + fibonacci (n-2)

# tests

if session.length > 10
    alert "long titre"
else
    alert "moins long"

extension =".coffee"
langage = "coffeescript" unless extension = ".js"
	
active = true

alert 17 if active					

# égalité

alert '0' is 0

# portée

# Boucles et compréhensions de liste

nombres = [1..25]

pairs = (n for n in nombres when n % 2 == 0)

alert pairs

# objets



# slicing

semaine = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]
milieu = semaine[2..4]
alert milieu

car = (list) -> if list.length > 0 then list[0] else null
cdr = (list) -> if list.length > 1 then list[1..] else []

alert cdr milieu
alert cdr [0]

semaine[2..4] = ["morcrodi","jodi","vondrodi"]

alert semaine


# absorber les références nulles

toto.titi?().truc?.bidule

# switch

work = -> alert "on bosse"
present = -> alert "javascript dans tous ses états"
attend = -> alert "ohai"
sleep = -> alert "zzzzzz"

day = "Jeudi"

switch day
  when "Lun" then work()
  when "Mar" then present()
  when "Mer" then attend()
  else sleep()
  
# multi ligne

texte = "Ceci est un long texte avec
des sauts de ligne encore un saut de ligne
et hop
et encore hop"

alert texte

texte2 = '''
	Ceci est un long texte avec
		des sauts de ligne encore un saut de ligne
					et hop
	et encore hop
	'''
alert texte2

#heredocs

alert "toto"

###
Ici on va afficher quelque
chose d'autre
###

alert titi




