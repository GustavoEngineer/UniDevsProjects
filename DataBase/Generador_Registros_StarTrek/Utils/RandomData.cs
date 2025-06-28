using System;
using System.Collections.Generic;

namespace StarTrekDataGenerator.Utils
{
    public static class RandomData
    {
        private static readonly Random _random = new Random();

        public static T GetRandomElement<T>(IList<T> list)
        {
            if (list == null || list.Count == 0)
            {
                throw new ArgumentException("List cannot be null or empty.");
            }
            return list[_random.Next(list.Count)];
        }

        public static double GetRandomDouble(double minValue, double maxValue)
        {
            return minValue + (_random.NextDouble() * (maxValue - minValue));
        }

        public static int GetRandomInt(int minValue, int maxValue)
        {
            return _random.Next(minValue, maxValue + 1); // +1 because Next is exclusive
        }

        public static long GetRandomLong(long minValue, long maxValue)
        {
            byte[] buf = new byte[8];
            _random.NextBytes(buf);
            long longRand = BitConverter.ToInt64(buf, 0);
            return (Math.Abs(longRand % (maxValue - minValue)) + minValue);
        }
    }
}