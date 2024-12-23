using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamesAndTests
{
    public class BarierExample
    {
        private ICardReader reader;
        private SQLUserChecker userChecker = new SQLUserChecker();
        private H1GateManager gateManager = new H1GateManager();

        public BarierExample(ICardReader reader)
        {
            this.reader = reader;
        }

        void Start()
        {
            while (true)
            {
                var tz = reader.GetUid();
                if (userChecker.IsTzValid(tz))
                {
                    gateManager.OpenGateFor1();
                }
                else
                {
                    Console.WriteLine("Sorry....");
                }
            }
        }

        class SQLUserChecker
        {
            public bool IsTzValid(string tz)
            {
                return true;
            }
        }

        public interface ICardReader
        {
            string GetUid();
        }

        class HPCardReader : ICardReader
        {
            public string GetUid()
            {
                return "";
            }
        }

        class H1GateManager
        {
            public void OpenGateFor1()
            {

            }
        }
    }
}