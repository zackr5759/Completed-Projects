# Zachary Robinson CS415 fa21 Project 1
# No partner

import random


def main():
    while 1:
        print("\nEnter 1-4 to select an option:")
        print(" 1: Encrypt and Decrypt a message (integers) in the form of a number")
        print(" 2: Given n, find smallest number j that satisfies the series 1 + 1/2 + 1/3... i/j > n")
        print(" 3: Given n, output G(n) where G(n) = 3/2 G(n-1) + G(n-2) and G(0) = 1/19 and G(1) = 3/7")
        print(" 4: Quit")
        response = int(input())

        if response == 1:
            print("Enter bit count of prime numbers used for encryption (1-100, n < 80 for large messages)")
            n1 = int(input())
            print("Please enter confidence interval for determining primes (1-20)")
            k1 = int(input())
            print("Please enter message to encrypt (numbers only)")
            message = int(input())

            p = generate_prime(n1, k1)
            q = generate_prime(n1, k1)

            pq = (p - 1) * (q - 1)

            N = p * q

            E = rand = random.randint(pow(10, n1 - 1), pow(10, n1) - 1)
            e = egcd2(E, pq)
            while e[2] != 1:
                E = rand = random.randint(pow(10, n1 - 1), pow(10, n1) - 1)
                e = egcd2(E, pq)

            D = inverse_modulo(E, pq)

            C = modular_exponentiation(message, E, N)

            print("This is the encrypted message", C)
            print("This is the decrypted message", modular_exponentiation(C, D, N))
        if response == 2:
            print("Please enter an n value to count up to (n < 15 or the computation can take several minutes)")
            n_in = int(input())
            print("The lowest value of j for the series is", hsum(n_in))
        if response == 3:
            print("Please enter n for G(n) (n < 30 or the computation can take several minutes)")
            n_in = int(input())
            g = gseries(n_in)
            print("G(", n_in, ") = ", g.numerator, "/", g.denominator)
        if response == 4:
            break


def modular_exponentiation(x, y, n):
    if y == 0:
        return 1
    z = modular_exponentiation(x, y//2, n)
    if y % 2 == 0:
        return (z * z) % n
    else:
        return (x * z * z) % n


def primality3(n, k):
    if (n % 2 == 0 and n != 2) or (n % 3 == 0 and n != 3) or (n % 5 == 0 and n != 5) or (n % 7 == 0 and n != 7):
        return 0
    return primality2(n, k)


def primality2(n, k):
    for i in range(k):
        if primality(n):
            return 1
    return 0


def primality(n):
    a = random.randrange(2, n)
    if modular_exponentiation(a, n-1, n) == 1:
        return 1
    else:
        return 0


def generate_prime(n, k):
    randprime = random.randint(pow(10, n - 1), pow(10, n) - 1)
    while primality3(randprime, k) == 0:
        randprime = random.randint(pow(10, n - 1), pow(10, n) - 1)
    return randprime


def inverse_modulo(a, b):
    g, x, y = extended_euclid(a, b)
    if g != 1:
        return 0
    else:
        return x % b


def extended_euclid(a, b):
    if a == 0:
        return b, 0, 1
    else:
        g, y, x = extended_euclid(b % a, a)
        return g, x - (b // a) * y, y


def egcd2(a, b):
    if b == 0:
        return 1, 0, a
    if b > a:
        return egcd2(b, a)
    else:
        if a % 2 == 0 and b % 2 == 0:
            x1, y1, d = egcd2(a//2, b//2)
            return x1, y1, 2*d
        else:
            x1, y1, d = egcd2(b, a % b)
            return y1, x1 - (a//b) * y1, d


def hsum(n):
    j = 1
    sum1 = Fraction(0, 1)
    n_fraction = Fraction(n, 1)
    while sum1.lessOrEqual(n_fraction):
        i = Fraction(1, j)
        sum1.add(i)
        j = j + 1
    return j - 1


def gseries(n):
    if n == 0:
        return Fraction(1, 19)
    if n == 1:
        return Fraction(3, 7)
    f2 = gseries(n-1).multiply(Fraction(3, 2))
    f3 = gseries(n-2)
    f2.add(f3)
    return f2


class Fraction:
    def __init__(self, top, bot):
        self.numerator = top
        self.denominator = bot

    def add(self, fraction):
        d1 = self.denominator
        d2 = fraction.denominator
        self.numerator *= d2
        self.denominator *= d2
        fraction.numerator *= d1
        fraction.denominator *= d1
        self.numerator += fraction.numerator
        self.reduce()
        return self

    def multiply(self, fraction):
        self.numerator = self.numerator * fraction.numerator
        self.denominator = self.denominator * fraction.denominator
        self.reduce()
        return self

    def reduce(self):
        returns = egcd2(self.numerator, self.denominator)
        if returns[2] > 1:
            self.numerator = self.numerator // returns[2]
            self.denominator = self.denominator // returns[2]
        return self

    def lessOrEqual(self, fraction):
        d1 = self.denominator
        d2 = fraction.denominator
        self.numerator *= d2
        self.denominator *= d2
        fraction.numerator *= d1
        fraction.denominator *= d1

        if self.numerator <= fraction.numerator:
            val = 1
        else:
            val = 0
        self.numerator /= d2
        self.denominator /= d2
        fraction.numerator /= d1
        fraction.denominator /= d1
        return val


if __name__ == '__main__':
    main()
